"use client"

import React, { useState } from "react"

export function DriverManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const drivers = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      email: "juan@email.com",
      phone: "+63 912 345 6789",
      philsys: "Verified",
      status: "Active",
      rides: 145,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "+63 923 456 7890",
      philsys: "Pending",
      status: "Active",
      rides: 89,
      rating: 4.6,
    },
    {
      id: 3,
      name: "Pedro Garcia",
      email: "pedro@email.com",
      phone: "+63 934 567 8901",
      philsys: "Verified",
      status: "Inactive",
      rides: 234,
      rating: 4.9,
    },
    {
      id: 4,
      name: "Ana Reyes",
      email: "ana@email.com",
      phone: "+63 945 678 9012",
      philsys: "Failed",
      status: "Suspended",
      rides: 67,
      rating: 4.2,
    },
  ]

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()),
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
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Driver Management</h1>
          <p className="text-muted-foreground">Manage and monitor all registered drivers</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
          Add New Driver
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">1,234</div>
          <div className="text-sm text-muted-foreground">Total Drivers</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-green-600">987</div>
          <div className="text-sm text-muted-foreground">Active Drivers</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-yellow-600">156</div>
          <div className="text-sm text-muted-foreground">Pending Verification</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-red-600">91</div>
          <div className="text-sm text-muted-foreground">Suspended</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <input
          type="text"
          placeholder="Search drivers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-border rounded-lg bg-input text-foreground"
        />
      </div>

      {/* Drivers Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Driver</th>
                <th className="text-left p-4 font-medium text-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-foreground">PhilSys Status</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Rides</th>
                <th className="text-left p-4 font-medium text-foreground">Rating</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="border-t border-border">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-medium">
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{driver.name}</div>
                        <div className="text-sm text-muted-foreground">{driver.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{driver.phone}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPhilSysColor(driver.philsys)}`}>
                      {driver.philsys}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="p-4 text-foreground">{driver.rides}</td>
                  <td className="p-4 text-foreground">⭐ {driver.rating}</td>
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

export default DriverManagement