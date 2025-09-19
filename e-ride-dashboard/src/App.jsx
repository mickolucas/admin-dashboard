import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import DashboardOverview from './components/DashboardOverview'
import DriverManagement from './components/DriverManagement'
import PassengerManagement from './components/PassengerManagement'
import RideMonitoring from './components/RideMonitoring'
import OwnershipPlanTracking from './components/OwnershipPlanTracking'
import ReportingDashboard from './components/ReportingDashboard'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="drivers" element={<DriverManagement />} />
          <Route path="passengers" element={<PassengerManagement />} />
          <Route path="rides" element={<RideMonitoring />} />
          <Route path="ownership" element={<OwnershipPlanTracking />} />
          <Route path="reports" element={<ReportingDashboard />} />
        </Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App