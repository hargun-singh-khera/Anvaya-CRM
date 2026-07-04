import React from 'react'

const StatsCard = ({ title, leads }) => {
    return (
        <div className="col-md-4 mb-3">
            <div className="card bg-light border-0 p-1 shadow-sm rounded-4">
                <div className="card-body">
                    <div className="card-title">
                        <h6>{title} Leads</h6>
                    </div>
                    <div className="card-text">
                        <h1>{leads?.length || 0}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsCard