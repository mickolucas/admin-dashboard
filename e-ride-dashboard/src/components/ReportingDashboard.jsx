import React from 'react'

export function ReportingDashboard() {
  const dailyRidesData = [
    { day: "Mon", rides: 245 },
    { day: "Tue", rides: 312 },
    { day: "Wed", rides: 289 },
    { day: "Thu", rides: 356 },
    { day: "Fri", rides: 423 },
    { day: "Sat", rides: 567 },
    { day: "Sun", rides: 445 },
  ]

  const monthlyRepaymentsData = [
    { month: "Jan", amount: 2450000 },
    { month: "Feb", amount: 2680000 },
    { month: "Mar", amount: 2890000 },
    { month: "Apr", amount: 3120000 },
    { month: "May", amount: 2950000 },
    { month: "Jun", amount: 3340000 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into your E-ride platform performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">15,678</div>
          <div className="text-sm text-muted-foreground">Total Rides This Month</div>
          <div className="text-xs text-green-600">+12% from last month</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">₱3,340,000</div>
          <div className="text-sm text-muted-foreground">Monthly Revenue</div>
          <div className="text-xs text-green-600">+8% from last month</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">1,234</div>
          <div className="text-sm text-muted-foreground">Active Drivers</div>
          <div className="text-xs text-green-600">+5% from last month</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">4.8</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
          <div className="text-xs text-green-600">+0.2 from last month</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Rides Chart */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Daily Rides This Week</h3>
          <div className="space-y-4">
            {dailyRidesData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm text-muted-foreground">{data.day}</div>
                <div className="flex-1 bg-muted rounded-full h-6 relative">
                  <div
                    className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(data.rides / 600) * 100}%` }}
                  >
                    <span className="text-xs text-primary-foreground font-medium">{data.rides}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Repayments Chart */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Repayments (₱)</h3>
          <div className="space-y-4">
            {monthlyRepaymentsData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm text-muted-foreground">{data.month}</div>
                <div className="flex-1 bg-muted rounded-full h-6 relative">
                  <div
                    className="bg-accent h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(data.amount / 3500000) * 100}%` }}
                  >
                    <span className="text-xs text-accent-foreground font-medium">
                      ₱{(data.amount / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Distribution */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Toyota Vios</span>
              <span className="text-muted-foreground">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Honda City</span>
              <span className="text-muted-foreground">28%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Nissan Almera</span>
              <span className="text-muted-foreground">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Others</span>
              <span className="text-muted-foreground">12%</span>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Drivers</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-foreground">Juan Dela Cruz</div>
                <div className="text-sm text-muted-foreground">234 rides</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">⭐ 4.9</div>
                <div className="text-sm text-muted-foreground">₱45,600</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-foreground">Maria Santos</div>
                <div className="text-sm text-muted-foreground">198 rides</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">⭐ 4.8</div>
                <div className="text-sm text-muted-foreground">₱38,200</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-foreground">Pedro Garcia</div>
                <div className="text-sm text-muted-foreground">176 rides</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">⭐ 4.7</div>
                <div className="text-sm text-muted-foreground">₱34,800</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportingDashboard
