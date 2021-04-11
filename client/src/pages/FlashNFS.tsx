import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { withPush } from "../utils/routingDecorators";
import FlashLayout from "../layouts/Flash";
import { TitleLogoBar } from "../layouts/Header";
import { LoadingFullScreen } from "../components/Loading";
import { SlideshowNFS } from "../components/flash/SlideshowNFS";
import { Mode, User } from "../logic/types";
import { FlashData } from "../logic/dataTypes";
import { NEED_FOR_SPEED } from "../constants/nfsData";

interface Props {
  user: User;
  mode: Mode;
  setMode: any;
  data: FlashData;
  //   getData: any;
}
const FlashNFS = ({
  user,
  mode,
  setMode,
  data,
}: //   getData,
Props) => {
  // const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  let { id }: { id: string } = useParams();
  id = id?.toLowerCase();

  // Delay the transitions 5 seconds, when all CSS transitions are finished
  let [play, setPlay] = useState(false);

  const appId = id as string;

  // Uses theme provider (wrapper) nesting to apply different styles per app
  return data ? (
    <FlashLayout
      user={user}
      mode={mode}
      setMode={setMode}
      appId={appId}
      header={
        <TitleLogoBar
          play={play}
          appId={appId}
          title={`NEED-FOR-FLASH`}
          titleShort={`NFS-FLASH`}
          subtitle={``}
          backIcon={true}
        />
      }
    >
      <SlideshowNFS
        play={play}
        setPlay={setPlay}
        appId={appId}
        data={NEED_FOR_SPEED}
      />
    </FlashLayout>
  ) : (
    <FlashLayout
      user={user}
      mode="dark"
      setMode={setMode}
      appId="DEFAULT"
      bgIndex={0}
    >
      <LoadingFullScreen />
    </FlashLayout>
  );
};

export default withPush(FlashNFS);
