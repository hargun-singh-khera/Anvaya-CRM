import React from 'react'

const CardPlaceholder = () => {
    return (
        <div className="col-md-4">
            <div className="card p-2 mb-3 rounded-4 shadow-sm" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-8"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-5"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-5"></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardPlaceholder