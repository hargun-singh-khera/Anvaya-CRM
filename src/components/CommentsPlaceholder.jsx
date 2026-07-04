import React from 'react'

const CommentsPlaceholder = () => {
    return (
        <div className="card p-2 mb-3 rounded-3" aria-hidden="true">
            <div className="card-body">
                <h5 className="card-title placeholder-glow d-flex justify-content-between">
                    <span className="placeholder col-3"></span>
                    <span className="placeholder col-2"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span class="placeholder col-5"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-3"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-3"></span>
                </p>
            </div>
        </div>
    )
}

export default CommentsPlaceholder