import React from "react"

export function OwnershipPlanTracking() {
  const ownershipPlans = [
    {
      id: 1,
      driver: "Juan Dela Cruz",
      vehicle: "Toyota Vios 2022",
      totalAmount: 800000,
      paidAmount: 320000,
      monthlyPayment: 15000,
      nextDue: "2024-02-15",
      status: "Active",
      progress: 40,
    },
    {
      id: 2,
      driver: "Maria Santos",
      vehicle: "Honda City 2023",
      totalAmount: 900000,
      paidAmount: 450000,
      monthlyPayment: 18000,
      nextDue: "2024-02-20",
      status: "Active",
      progress: 50,
    },
    {
      id: 3,
      driver: "Pedro Garcia",
      vehicle: "Mitsubishi Mirage 2021",
      totalAmount: 650000,
      paidAmount: 650000,
      monthlyPayment: 0,
      nextDue: "Completed",
      status: "Completed",
      progress: 100,
    },
    {
      id: 4,
      driver: "Ana Reyes",
      vehicle: "Nissan Almera 2022",
      totalAmount: 750000,
      paidAmount: 150000,
      monthlyPayment: 16000,
      nextDue: "2024-01-10",
      status: "Overdue",
      progress: 20,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Ownership Plan Tracking</h1>
        <p className="text-muted-foreground">Monitor vehicle ownership plans and payment schedules</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">156</div>
          <div className="text-sm text-muted-foreground">Active Contracts</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-green-600">89</div>
          <div className="text-sm text-muted-foreground">Completed Plans</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">₱2,450,000</div>
          <div className="text-sm text-muted-foreground">Monthly Collections</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-red-600">₱180,000</div>
          <div className="text-sm text-muted-foreground">Overdue Amount</div>
        </div>
      </div>

      {/* Ownership Plans Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Driver</th>
                <th className="text-left p-4 font-medium text-foreground">Vehicle</th>
                <th className="text-left p-4 font-medium text-foreground">Payment Progress</th>
                <th className="text-left p-4 font-medium text-foreground">Monthly Payment</th>
                <th className="text-left p-4 font-medium text-foreground">Next Due</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ownershipPlans.map((plan) => (
                <tr key={plan.id} className="border-t border-border">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-medium">
                          {plan.driver
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="font-medium text-foreground">{plan.driver}</div>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{plan.vehicle}</td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">
                          ₱{plan.paidAmount.toLocaleString()} / ₱{plan.totalAmount.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">{plan.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(plan.progress)}`}
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">₱{plan.monthlyPayment.toLocaleString()}</td>
                  <td className="p-4 text-foreground">{plan.nextDue}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                      {plan.status}
                    </span>
                  </td>
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

export default OwnershipPlanTracking
