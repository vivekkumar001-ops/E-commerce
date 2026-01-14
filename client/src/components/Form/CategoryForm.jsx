import React from "react";
const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Category"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary mt-2" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};
export default CategoryForm;