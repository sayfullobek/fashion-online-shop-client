export const Loading = () => {
    return (
        <div className={"w-100 d-flex align-items-center justify-content-center"} style={{height:'70vh'}}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}