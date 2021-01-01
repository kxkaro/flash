import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { withPush } from "../utils/routingDecorators";
import FlashLayout from "../layouts/Flash";
import { TitleLogoBar } from "../layouts/Header";
import { LoadingFullScreen } from "../components/Loading";
import { Slideshow } from "../components/flash/Slideshow";
import { FooterTicker } from "../components/flash/FooterTicker";
import { Mode, User, StateDataMap } from "../logic/types";
import { NEED_FOR_SPEED } from '../constants/nfsData';

interface Props {
  user: User;
  mode: Mode;
  setMode: any;
  data: StateDataMap;
  getData: any;
  bgIndex: number;
  setBgIndex: any;
}
const Flash = ({
  user,
  mode,
  setMode,
  data,
  getData,
  bgIndex,
  setBgIndex,
}: Props) => {
  // const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  let { id }: { id: string } = useParams();
  id = id?.toLowerCase();

  // Delay the transitions 5 seconds, when all CSS transitions are finished
  let [play, setPlay] = useState(false);
  let [init, setInit] = useState(false);

  useEffect(() => {
    if (!data) {
      getData();
    }

    // Init is used to pause css animations
    // Delay play until entry animations are finished
    if (!init && data) {
      const timeout = setTimeout(() => {
        setPlay(true);
        setInit(true);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [init, data, getData]);

  const appId = id as string;

  const selectedData = data?.get(appId);
  const tickerData = selectedData?.ticker;
  const slidesData = selectedData?.slides;

  // Uses theme provider (wrapper) nesting to apply different styles per app
  return data ? (
    <FlashLayout
      user={user}
      mode={mode}
      setMode={setMode}
      appId={appId}
      bgIndex={bgIndex}
      header={
        <TitleLogoBar
          play={play}
          appId={appId}
          title={`_FLASH`}
          titleShort={`_FLASH`}
          subtitle={``}
          backIcon={true}
        />
      }
      footer={
        tickerData && (
          <FooterTicker
            appId={appId}
            init={init}
            play={play}
            text="Powered by kxkaro"
            data={tickerData}
          />
        )
      }
    >
      {slidesData && (
        <Slideshow
          init={init}
          play={play}
          setPlay={setPlay}
          appId={appId}
          bgIndex={bgIndex}
          setBgIndex={setBgIndex}
          data={slidesData}
        />
      )}
    </FlashLayout>
  ) : (
    <FlashLayout
      user={user}
      mode="dark"
      setMode={setMode}
      appId="DEFAULT"
      bgIndex={bgIndex}
    >
      <LoadingFullScreen />
    </FlashLayout>
  );
};

export default withPush(Flash);
