"use client"

import React, { useState } from "react"

export function RideMonitoring() {
  const [statusFilter, setStatusFilter] = useState("all")

  const rides = [
    {
      id: "R001",
      passenger: "Lisa Chen",
      driver: "Juan Dela Cruz",
      pickup: "Makati CBD",
      destination: "BGC",
      fare: "₱250",
      status: "Completed",
      time: "2024-01-15 14:30",
      payment: "GCash",
    },
    {
      id: "R002",
      passenger: "Mark Johnson",
      driver: "Maria Santos",
      pickup: "Ortigas",
      destination: "Quezon City",
      fare: "₱180",
      status: "In Progress",
      time: "2024-01-15 15:45",
      payment: "Cash",
    },
    {
      id: "R003",
      passenger: "Sarah Wilson",
      driver: "Pedro Garcia",
      pickup: "Alabang",
      destination: "Makati",
      fare: "₱320",
      status: "Cancelled",
      time: "2024-01-15 16:20",
      payment: "Card",
    },
    {
      id: "R004",
      passenger: "David Brown",
      driver: "Ana Reyes",
      pickup: "Pasig",
      destination: "Manila",
      fare: "₱200",
      status: "Pending",
      time: "2024-01-15 17:10",
      payment: "GCash",
    },
  ]

  const filteredRides =
    statusFilter === "all" ? rides : rides.filter((ride) => ride.status.toLowerCase() === statusFilter.toLowerCase())

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Ride Monitoring</h1>
        <p className="text-muted-foreground">Track and monitor all ride activities in real-time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">2,456</div>
          <div className="text-sm text-muted-foreground">Total Rides Today</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-green-600">2,123</div>
          <div className="text-sm text-muted-foreground">Completed Rides</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-blue-600">89</div>
          <div className="text-sm text-muted-foreground">Active Rides</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">₱567,890</div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-border rounded-lg bg-input text-foreground"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in progress">In Progress</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Rides Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Ride ID</th>
                <th className="text-left p-4 font-medium text-foreground">Passenger</th>
                <th className="text-left p-4 font-medium text-foreground">Driver</th>
                <th className="text-left p-4 font-medium text-foreground">Route</th>
                <th className="text-left p-4 font-medium text-foreground">Fare</th>
                <th className="text-left p-4 font-medium text-foreground">Payment</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Time</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRides.map((ride) => (
                <tr key={ride.id} className="border-t border-border">
                  <td className="p-4 font-medium text-foreground">{ride.id}</td>
                  <td className="p-4 text-foreground">{ride.passenger}</td>
                  <td className="p-4 text-foreground">{ride.driver}</td>
                  <td className="p-4">
                    <div className="text-foreground">
                      <div className="text-sm">{ride.pickup}</div>
                      <div className="text-xs text-muted-foreground">→ {ride.destination}</div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-foreground">{ride.fare}</td>
                  <td className="p-4 text-foreground">{ride.payment}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.status)}`}>
                      {ride.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{ride.time}</td>
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

export default RideMonitoring 