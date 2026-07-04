import React from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch'
import { Link } from 'react-router-dom'

const SalesAgentManagement = () => {
    const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
    // console.log("data", data)

    const RenderTablePlaceholder = () => {
        return (
            <tr className="placeholder-glow">
                <th>
                    <span class="placeholder placeholder-lg col-3 rounded-1"></span>
                </th>
                <td>
                    <span class="placeholder placeholder-lg col-3 rounded-1"></span>
                </td>
                <td>
                    <span class="placeholder placeholder-lg col-8 rounded-1"></span>
                </td>
            </tr>
        )
    }

    return (
        <div className="container-fluid  py-4">
            <div className="row">
                <h2 className="text-center mb-4">Sales Agent Management</h2>
                <Sidebar />
                <div className="col-md-8 mx-auto">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && Array.from({ length: 10 }).map((_, index) => <RenderTablePlaceholder key={index} />)}
                            {!loading && data?.length === 0 && <td colSpan={3} className="text-center"><p className="text-center py-4">No leads found.</p></td>}
                            {error && <td colSpan={3} className="text-center"><p className="text-center py-4">{error}</p></td>}
                            {data?.salesAgent?.map((agent, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{agent.name}</td>
                                    <td>{agent.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to={"/sales-agent/add"} className="btn btn-primary">Add New Sales Agent</Link>
                </div>
            </div>
        </div>
    )
}

export default SalesAgentManagement