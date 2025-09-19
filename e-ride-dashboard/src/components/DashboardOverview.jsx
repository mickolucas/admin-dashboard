import React from 'react'

export function DashboardOverview() {
  const stats = [
    { title: "Total Drivers", value: "1,234", change: "+12%", icon: "🚗" },
    { title: "Active Rides", value: "89", change: "+5%", icon: "🛣️" },
    { title: "Total Revenue", value: "₱45,678", change: "+18%", icon: "💰" },
    { title: "Passengers", value: "5,432", change: "+8%", icon: "👥" },
  ]

  const recentActivities = [
    { id: 1, action: "New driver registered", user: "Juan Dela Cruz", time: "2 minutes ago" },
    { id: 2, action: "Ride completed", user: "Maria Santos", time: "5 minutes ago" },
    { id: 3, action: "Payment received", user: "Pedro Garcia", time: "10 minutes ago" },
    { id: 4, action: "Vehicle inspection due", user: "Ana Reyes", time: "15 minutes ago" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your E-ride platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm">{stat.change} from last month</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-primary text-primary-foreground border - 1 rounded-lg hover:bg-primary/90 transition-colors">
            <div className="text-2xl mb-2">➕</div>
            <div className="font-medium">Add New Driver</div>
          </button>
          <button className="p-4 bg-secondary text-secondary-foreground border -1 rounded-lg hover:bg-secondary/90 transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">View Reports</div>
          </button>
          <button className="p-4 bg-secondary text-secondary-foreground border -1 rounded-lg hover:bg-secondary/90 transition-colors">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-medium">System Settings</div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
            >
              <div>
                <p className="font-medium text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.user}</p>
              </div>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
