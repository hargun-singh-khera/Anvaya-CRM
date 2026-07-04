import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch'
import toast, { Toaster } from 'react-hot-toast'

const Settings = () => {
    const { data: leadsData, loading: leadsLoading, error: leadsError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
    // console.log("leadsData", leadsData)
    // const { data: agentsData, loading: agentsLoading, error: agentsError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
    // console.log("agentsData", agentsData)


    const [leads, setLeads] = useState([])
    // const [agents, setAgents] = useState([])

    useEffect(() => {
        setLeads(leadsData?.leads)
        // setAgents(agentsData?.salesAgent)
    }, [leadsData])


    // console.log("leads", leads)
    // console.log("agents", agents)

    const handleDeleteLead = async (leadId) => {
        try {
            const response = await fetch(`https://neo-g-backend-9d5c.vercel.app/api/leads/${leadId}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Failed to delete lead.")
            }
            setLeads((prevLeads) => prevLeads.filter(lead => lead._id !== leadId))
            toast.success("Lead deleted successfully")
        } catch (error) {
            console.log("Error while deleting lead")
            toast.error(error)
        }
    }

    const handleDeleteAgent = async (agentId) => {
        try {
            const response = await fetch(`https://neo-g-backend-9d5c.vercel.app/api/agents/${agentId}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Failed to delete sales agent.")
            }
            setAgents((prevAgents) => prevAgents.filter(agent => agent._id !== agentId))
            toast.success("Sales agent deleted successfully")
        } catch (error) {
            console.log("Error while deleting sales agent")
            toast.error(error)
        }
    }

    const RenderTablePlaceholder = () => {
        return (
            <tr className="placeholder-glow">
                <th>
                    <span class="placeholder placeholder-lg col-3 rounded-1"></span>
                </th>
                <td>
                    <span class="placeholder placeholder-lg col-6 rounded-1"></span>
                </td>
                <td>
                    <span class="placeholder btn btn-sm btn-danger disabled col-4"></span>
                </td>
            </tr>
        )
    }


    return (
        <div className="container-fluid py-4">
            <div className="row">
                <h2 className="text-center mb-4">Settings</h2>
                <Sidebar />
                <div className="col-md-9 my-4 mx-auto px-md-5">
                    <h3 className="mb-3">Leads</h3>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leadsLoading && Array.from({ length: 10 }).map((_, index) => <RenderTablePlaceholder key={index} />)}
                            {!leadsLoading && leadsData?.length === 0 && <td colSpan={3} className="text-center"><p className="text-center py-4">No leads found.</p></td>}
                            {leadsError && <td colSpan={3} className="text-center"><p className="text-center py-4">{leadsError}</p></td>}
                            {leads?.map((lead, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{lead.name}</td>
                                    <td><button onClick={() => handleDeleteLead(lead._id)} className="btn btn-sm btn-danger">Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Settings