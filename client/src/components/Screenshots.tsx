import { Modal, Box } from "@mui/material";
import { useState } from "react";
import { GameInterface } from "../interfaces/interfaces";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface ScreenshotsInterface {
    game: GameInterface | null;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
};

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export default function Screenshots({ game }: ScreenshotsInterface) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            {game?.screenshots && game.screenshots.length > 0 ? (
                <img
                    src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.screenshots[0].image_id}.jpg`}
                    alt="Game screenshot"
                    onClick={handleOpen}
                    className="cursor-pointer max-w-[810px]"
                />
            ) : (
                <p>No screenshots available</p>
            )}

            <Modal
                open={open}
                onClose={handleClose}>
                <Box sx={style}>
                    <Carousel responsive={responsive} className="">
                        {
                            game?.screenshots?.map((screenshot) => {
                                return <img key={screenshot.id} src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${screenshot.image_id}.jpg`} alt="" />
                            })
                        }
                    </Carousel>
                </Box>
            </Modal>
        </>
    );
}
