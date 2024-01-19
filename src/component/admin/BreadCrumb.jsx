import {Link} from "react-router-dom";
import {CLIENT_URL} from "../../utils/Utils";

export const BreadCrumb = ({name, formArr, saveFunction}) => {
    return (
        <div>
            <div className={"w-100 card"}>
                <div className={"p-3 w-100 mt-3 d-flex align-items-center justify-content-between"}>
                    <nav style={{bsBreadcrumbDivider: '>'}} aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={CLIENT_URL}>Asosiy bo'lim</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{name}</li>
                        </ol>
                    </nav>
                    <button className="btn btn-primary mb-3" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <i className="bi bi-plus-circle"/>
                    </button>
                </div>
            </div>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight"
                 aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">{formArr.name}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"/>
                </div>
                <div className="offcanvas-body">
                    {formArr.arr.map(item => (
                        <>
                            {item.type === "file" ? (
                                <div className="mb-3">
                                    <label htmlFor={item.name} className="form-label">{item.name}</label>
                                    <input type={item.type} value={item.value}
                                           className="form-control" id="photo"
                                           placeholder={item.name}/>
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <label htmlFor={item.name} className="form-label">{item.name}</label>
                                    <input type={item.type} value={item.value}
                                           onChange={e => item.setValue(e.target.value)}
                                           className="form-control" id={item.name}
                                           placeholder={item.name}/>
                                </div>
                            )}
                        </>
                    ))}
                </div>
                <button className={"btn btn-primary m-2"} onClick={() => saveFunction()}>Saqlash</button>
            </div>
        </div>
    )
}