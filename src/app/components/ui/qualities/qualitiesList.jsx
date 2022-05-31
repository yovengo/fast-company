import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { getQuality, isLoading } = useQualities();
    const userQualities = qualities.map((quality) => getQuality(quality));

    if (!isLoading) {
        return (
            <>
                {userQualities.map((quality) => (
                    <Quality
                        key={quality._id}
                        isLoading={isLoading}
                        {...quality}
                    />
                ))}
            </>
        );
    } else return "Loading...";
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitiesList;
