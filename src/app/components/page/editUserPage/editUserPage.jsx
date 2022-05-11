import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const EditUserPage = ({ userId }) => {
    const [data, setData] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData({
                name: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities.map((optionName) => ({
                    label: optionName.name,
                    value: optionName._id,
                    color: optionName.color
                }))
            });
        });
    }, []);

    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof?.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem?.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object?.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(data?.profession),
            qualities: getQualities(data?.qualities)
        }).then((data) => {
            console.log(data);
        });
        history.push(`/users/${userId}`);
    };
    if (data) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField label="Имя"
                                name="name" value={data?.name}
                                onChange={handleChange}
                            />
                            <TextField label="Электронная почта"
                                name="email" value={data?.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professions}
                                onChange={handleChange}
                                value={data?.profession}
                            />
                            <RadioField options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={data?.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data?.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button type="submit"
                                className="btn btn-primary w-100 mx-auto">Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};
EditUserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default EditUserPage;
