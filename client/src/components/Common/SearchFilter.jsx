import React from "react";

const SearchFilter = ({ onChange = () => {}, breeds = [] }) => {
    console.log(breeds);
    return (
        <div className="container-fluid">
            <form>
                <div className="row mb-4">
                    <div className="col-sm-2">
                        <select
                            className="form-control"
                            name="atype"
                            onChange={onChange}
                        >
                            <option value="">Select Animal</option>
                            <option value="1">Dog</option>
                            <option value="2">Cat</option>
                            <option value="3">Other</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <select
                            className="form-control"
                            name="gender"
                            onChange={onChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <select
                            className="form-control"
                            name="breed"
                            onChange={onChange}
                        >
                            <option value="">Select Breed</option>
                            {breeds?.map((breed) => (
                                <option key={breed.id} value={breed.id}>{breed.breed}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchFilter;
