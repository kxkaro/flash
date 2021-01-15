import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { withPush } from "../utils/routingDecorators";
import FlashLayout from "../layouts/Flash";
import { TitleLogoBar } from "../layouts/Header";
import { LoadingFullScreen } from "../components/Loading";
import { Slideshow2 } from "../components/flash/Slideshow2";
import { Mode, User } from "../logic/types";
import { FlashData } from "../logic/dataTypes";
import { NEED_FOR_SPEED } from '../constants/nfsData';

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    data: FlashData;
    //   getData: any;
}
const Flash2 = ({
    user,
    mode,
    setMode,
    data,
    //   getData,
}: Props) => {
    // const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    let { id }: { id: string } = useParams();
    id = id?.toLowerCase();

    // Delay the transitions 5 seconds, when all CSS transitions are finished
    let [play, setPlay] = useState(true);
    let [init, setInit] = useState(false);

    // useEffect(() => {
    //     // if (!data) {
    //     //   getData();
    //     // }

    //     // Init is used to pause css animations
    //     // Delay play until entry animations are finished
    //     if (!init && data) {
    //         const timeout = setTimeout(() => {
    //             setPlay(true);
    //             setInit(true);
    //         }, 5000);

    //         return () => clearTimeout(timeout);
    //     }
    // }, [
    //     init,
    //     data,
    //     // getData
    // ]);

    const appId = id as string;

    // Uses theme provider (wrapper) nesting to apply different styles per app
    return data ? (
        <FlashLayout
            user={user}
            mode={mode}
            setMode={setMode}
            appId={appId}
            bgIndex={0}
            header={
                <TitleLogoBar
                    play={play}
                    appId={appId}
                    title={`_NEED_FOR_FLASH`}
                    titleShort={`_NFS_FLASH`}
                    subtitle={``}
                    backIcon={true}
                />
            }
        >
            <Slideshow2
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

export default withPush(Flash2);
