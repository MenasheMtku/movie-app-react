import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import "./cardItem.css"
import { imageUrl, defaultImage } from "../../request"

const CardItem = (props) => {
    // console.log(props.title);
    const apiImage = imageUrl
    // const defaultImg = import.meta.env.VITE_REACT_APP_API_DEFAULT_IMG;
    const DEFAULT_IMG = defaultImage
    const handleClick = () => {
        // console.log("Clicked On Card");
        console.log(props?.title || props?.name)
    }
    return (
        <>
            <div
                className="movieCard relative overflow-hidden"
                onClick={handleClick}
            >
                <LazyLoadImage
                    src={
                        props.poster_path
                            ? apiImage + props.poster_path
                            : DEFAULT_IMG
                    }
                    effect="blur"
                    alt={props.title}
                />
                <div className="flex items-center justify-between  bg-orange-300 px-1  py-2">
                    <p className="title overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-black">
                        {props.title}
                    </p>
                    <p className="py-2 text-sm  font-semibold text-blue-800">
                        {props.vote_average}
                    </p>
                </div>
                <div>
                    {/* <p className='overview absolute top-0 bottom-0 left-0 right-0'>{props.overview}</p> */}
                </div>
            </div>
        </>
    )
}

export default CardItem
