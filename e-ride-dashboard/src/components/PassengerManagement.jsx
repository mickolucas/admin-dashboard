"use client"

import React, { useState } from "react"

export function PassengerManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const passengers = [
    {
      id: 1,
      name: "Lisa Chen",
      email: "lisa@email.com",
      phone: "+63 912 345 6789",
      philsys: "Verified",
      status: "Active",
      rides: 45,
      joined: "2024-01-15",
    },
    {
      id: 2,
      name: "Mark Johnson",
      email: "mark@email.com",
      phone: "+63 923 456 7890",
      philsys: "Pending",
      status: "Active",
      rides: 23,
      joined: "2024-02-20",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      email: "sarah@email.com",
      phone: "+63 934 567 8901",
      philsys: "Verified",
      status: "Inactive",
      rides: 67,
      joined: "2023-12-10",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david@email.com",
      phone: "+63 945 678 9012",
      philsys: "Failed",
      status: "Suspended",
      rides: 12,
      joined: "2024-03-05",
    },
  ]

  const filteredPassengers = passengers.filter(
    (passenger) =>
      passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPhilSysColor = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Passenger Management</h1>
          <p className="text-muted-foreground">Manage and monitor all registered passengers</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
          Add New Passenger
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">5,432</div>
          <div className="text-sm text-muted-foreground">Total Passengers</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-green-600">4,876</div>
          <div className="text-sm text-muted-foreground">Active Passengers</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-yellow-600">234</div>
          <div className="text-sm text-muted-foreground">Pending Verification</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-red-600">322</div>
          <div className="text-sm text-muted-foreground">Suspended</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <input
          type="text"
          placeholder="Search passengers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-border rounded-lg bg-input text-foreground"
        />
      </div>

      {/* Passengers Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Passenger</th>
                <th className="text-left p-4 font-medium text-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-foreground">PhilSys Status</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Total Rides</th>
                <th className="text-left p-4 font-medium text-foreground">Joined</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPassengers.map((passenger) => (
                <tr key={passenger.id} className="border-t border-border">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-secondary-foreground font-medium">
                          {passenger.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{passenger.name}</div>
                        <div className="text-sm text-muted-foreground">{passenger.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{passenger.phone}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPhilSysColor(passenger.philsys)}`}
                    >
                      {passenger.philsys}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(passenger.status)}`}>
                      {passenger.status}
                    </span>
                  </td>
                  <td className="p-4 text-foreground">{passenger.rides}</td>
                  <td className="p-4 text-foreground">{passenger.joined}</td>
                  <td className="p-4">
                    <button className="text-primary hover:text-primary/80">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PassengerManagement
