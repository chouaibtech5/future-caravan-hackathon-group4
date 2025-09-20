import React, { useState, Suspense } from 'react';
import Nav from '../comp/Nav';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer';
import burgerImg from '../../assets/images/footer.png';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip);

// Error Boundary Component
class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Chart error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-gray-500 mb-2">Chart temporarily unavailable</div>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-[#F26522] text-white rounded-md text-sm hover:bg-[#e55a1a]"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load Recharts components to avoid React 19 compatibility issues
const LazyBarChart = React.lazy(() => 
  import('recharts').then(module => ({
    default: ({ data, ...props }) => {
      const { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } = module;
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 5, left: -10, bottom: 5 }}
            barSize={40}
            barGap={0}
            {...props}
          >
            <CartesianGrid 
              horizontal={true}
              vertical={false}
              strokeDasharray="4 4" 
              stroke="#F0F0F0" 
            />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#888' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              domain={[0, 800000]}
              ticks={[0, 200000, 400000, 600000, 800000]}
              tick={{ fontSize: 11, fill: '#888' }}
              tickFormatter={(value) => {
                if (value === 0) return '0 DA';
                if (value === 200000) return '200000 DA';
                if (value === 400000) return '400000 DA';
                if (value === 600000) return '600000 DA';
                if (value === 800000) return '800000 DA';
                return `${value} DA`;
              }}
              width={80}
            />
            <Bar 
              dataKey="income" 
              fill="#F26522" 
              radius={[0, 0, 10, 10]} 
              stackId="a"
              barSize={40}
              maxBarSize={40}
            />
            <Bar 
              dataKey="outcome" 
              fill="#F5DFBF" 
              radius={[10, 10, 0, 0]} 
              stackId="a"
              barSize={40}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  }))
);

const Dashboard = () => {
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calendar functions
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    const days = [];
    
    // Previous month's last days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${daysInPrevMonth - i}`} className="text-xs text-gray-400 py-2">
          {daysInPrevMonth - i}
        </div>
      );
    }
    
    // Current month days
    const reservedDates = [7, 11, 15, 22]; // Example reserved dates
    for (let day = 1; day <= daysInMonth; day++) {
      const isReserved = reservedDates.includes(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() && 
                     new Date().getFullYear() === currentDate.getFullYear();
      
      days.push(
        <div 
          key={day} 
          className={`text-xs py-2 hover:bg-gray-100 rounded cursor-pointer ${
            isReserved 
              ? day === 7 
                ? 'bg-[#F26522] text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto' 
                : 'bg-orange-100 text-[#F26522] rounded-full w-7 h-7 flex items-center justify-center mx-auto'
              : isToday 
                ? 'text-orange-500 font-bold' 
                : ''
          }`}
        >
          {day}
        </div>
      );
    }
    
    // Next month's first days to fill the grid
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="text-xs text-gray-400 py-2">
          {day}
        </div>
      );
    }
    
    return days;
  };

  // Dummy data for the dashboard
  const statsData = {
    income: { value: 120000.00, unit: 'DA', trend: 'up' },
    outcome: { value: 120000.00, unit: 'DA', trend: 'down' },
    conversionRate: { value: 5.10, unit: '%', trend: 'up' },
    employees: { value: 20, unit: 'employees', trend: 'neutral' }
  };

  // In the chart data, we're structuring it to create stacked bars with consistent heights
  const chartData = [
    // Each month has a fixed total height (income + outcome) of 650000
    { month: 'Jan', income: 400000, outcome: 300000, total: 650000 },
    { month: 'Feb', income: 200000, outcome: 20000, total: 650000 },
    { month: 'Mar', income: 600000, outcome: 50000, total: 650000 },
    { month: 'Apr', income: 350000, outcome: 300000, total: 650000 },
    { month: 'May', income: 150000, outcome: 500000, total: 650000 },
  ];

  const performanceData = {
    percentage: 8.966
  };

  const salesData = [
    {
      orderId: '#1000',
      customer: 'bouhafs rim 0567894523',
      items: [
        { 
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage ch...',
          status: 'Preparing',
          quantity: 2,
          subtotal: '1000 DA'
        },
        { 
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage ch...',
          status: 'Delivered',
          quantity: 1,
          subtotal: '1250 DA'
        },
        { 
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage ch...',
          status: 'Cancelled',
          quantity: 1,
          subtotal: '750 DA'
        },
      ],
      delivery: '200 DA',
      total: '6400 DA'
    },
    {
      orderId: '#1000',
      customer: 'bouhafs rim 0567894523',
      items: [
        { 
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage ch...',
          status: 'Preparing',
          quantity: 2,
          subtotal: '1000 DA'
        },
        { 
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage ch...',
          status: 'Delivered',
          quantity: 1,
          subtotal: '1250 DA'
        },
        { 
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage ch...',
          status: 'Cancelled',
          quantity: 1,
          subtotal: '750 DA'
        },
      ],
      delivery: '200 DA',
      total: '6400 DA'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Nav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#FFFBF8]">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className=" mx-auto py-4 px-6 flex items-center justify-between ">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center">
              <div className="relative mx-4">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                <span className="material-symbols-outlined">language</span>
              </button>
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className=" mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Income Card */}
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Income</p>
                  <p className="text-2xl font-semibold text-gray-900">{statsData.income.value.toLocaleString()} <span className="text-sm">{statsData.income.unit}</span></p>
                </div>
               
                 <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#C3E7A7"/>
<path d="M18.1667 11.5L13.6381 16.0286C13.4731 16.1936 13.3906 16.2761 13.2954 16.307C13.2117 16.3342 13.1216 16.3342 13.0379 16.307C12.9428 16.2761 12.8603 16.1936 12.6953 16.0286L11.1381 14.4714C10.9731 14.3064 10.8906 14.2239 10.7954 14.193C10.7117 14.1658 10.6216 14.1658 10.5379 14.193C10.4428 14.2239 10.3603 14.3064 10.1953 14.4714L6.5 18.1667M18.1667 11.5H14.8333M18.1667 11.5V14.8333M10.5 21.5H17.5C18.9001 21.5 19.6002 21.5 20.135 21.2275C20.6054 20.9878 20.9878 20.6054 21.2275 20.135C21.5 19.6002 21.5 18.9001 21.5 17.5V10.5C21.5 9.09987 21.5 8.3998 21.2275 7.86502C20.9878 7.39462 20.6054 7.01217 20.135 6.77248C19.6002 6.5 18.9001 6.5 17.5 6.5H10.5C9.09987 6.5 8.3998 6.5 7.86502 6.77248C7.39462 7.01217 7.01217 7.39462 6.77248 7.86502C6.5 8.3998 6.5 9.09987 6.5 10.5V17.5C6.5 18.9001 6.5 19.6002 6.77248 20.135C7.01217 20.6054 7.39462 20.9878 7.86502 21.2275C8.3998 21.5 9.09987 21.5 10.5 21.5Z" stroke="#659F38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            
              </div>
              
              {/* Outcome Card */}
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Outcome</p>
                  <p className="text-2xl font-semibold text-gray-900">{statsData.outcome.value.toLocaleString()} <span className="text-sm">{statsData.outcome.unit}</span></p>
                </div>
               <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.333496" width="32" height="32" rx="4" fill="#FFECEA"/>
<path d="M21.3335 19L15.8992 13.5657C15.7012 13.3677 15.6022 13.2687 15.488 13.2316C15.3876 13.1989 15.2794 13.1989 15.179 13.2316C15.0648 13.2687 14.9658 13.3677 14.7678 13.5657L12.8992 15.4343C12.7012 15.6323 12.6022 15.7313 12.488 15.7684C12.3876 15.8011 12.2794 15.8011 12.179 15.7684C12.0648 15.7313 11.9658 15.6323 11.7678 15.4343L7.3335 11M21.3335 19H17.3335M21.3335 19V15M12.1335 25H20.5335C22.2137 25 23.0537 25 23.6955 24.673C24.26 24.3854 24.7189 23.9265 25.0065 23.362C25.3335 22.7202 25.3335 21.8802 25.3335 20.2V11.8C25.3335 10.1198 25.3335 9.27976 25.0065 8.63803C24.7189 8.07354 24.26 7.6146 23.6955 7.32698C23.0537 7 22.2137 7 20.5335 7H12.1335C10.4533 7 9.61326 7 8.97152 7.32698C8.40704 7.6146 7.9481 8.07354 7.66048 8.63803C7.3335 9.27976 7.3335 10.1198 7.3335 11.8V20.2C7.3335 21.8802 7.3335 22.7202 7.66048 23.362C7.9481 23.9265 8.40704 24.3854 8.97152 24.673C9.61326 25 10.4533 25 12.1335 25Z" stroke="#E52614" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
              </div>
              
              {/* Conversion Rate Card */}
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{statsData.conversionRate.value} <span className="text-sm">{statsData.conversionRate.unit}</span></p>
                </div>
                <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.666504" width="28" height="28" rx="4" fill="#FFF2CA"/>
<path d="M21.3333 20.6667V14.8333M14.6667 20.6667V12.3333M8 20.6667L8 17.3333M15.8389 8.18959L20.1459 9.80472M13.6656 8.50077L9.00019 11.9999M22.2172 9.36612C22.7054 9.85427 22.7054 10.6457 22.2172 11.1339C21.7291 11.622 20.9376 11.622 20.4495 11.1339C19.9613 10.6457 19.9613 9.85427 20.4495 9.36612C20.9376 8.87796 21.7291 8.87796 22.2172 9.36612ZM8.88388 11.8661C9.37204 12.3543 9.37204 13.1457 8.88388 13.6339C8.39573 14.122 7.60427 14.122 7.11612 13.6339C6.62796 13.1457 6.62796 12.3543 7.11612 11.8661C7.60427 11.378 8.39573 11.378 8.88388 11.8661ZM15.5506 6.86612C16.0387 7.35427 16.0387 8.14573 15.5506 8.63388C15.0624 9.12204 14.2709 9.12204 13.7828 8.63388C13.2946 8.14573 13.2946 7.35427 13.7828 6.86612C14.2709 6.37796 15.0624 6.37796 15.5506 6.86612Z" stroke="#FFCA28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
              </div>
              
              {/* Employees Card */}
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Employees</p>
                  <p className="text-2xl font-semibold text-gray-900">{statsData.employees.value} <span className="text-sm">{statsData.employees.unit}</span></p>
                </div>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#EAF0FF"/>
<path d="M20.6668 21.5C20.6668 20.337 20.6668 19.7555 20.5233 19.2824C20.2001 18.217 19.3664 17.3834 18.3011 17.0602C17.8279 16.9167 17.2465 16.9167 16.0835 16.9167H11.9168C10.7539 16.9167 10.1724 16.9167 9.69921 17.0602C8.63388 17.3834 7.8002 18.217 7.47703 19.2824C7.3335 19.7555 7.3335 20.337 7.3335 21.5M17.7502 10.25C17.7502 12.3211 16.0712 14 14.0002 14C11.9291 14 10.2502 12.3211 10.2502 10.25C10.2502 8.17893 11.9291 6.5 14.0002 6.5C16.0712 6.5 17.7502 8.17893 17.7502 10.25Z" stroke="#002593" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
              </div>
            </div>

            {/* Charts and Calendar Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-15 mb-8">
                {/* Income & Outcome Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Income & Outcome</h3>
                    <div className="flex items-center space-x-1">
                      <button className="px-3 py-1 text-sm font-medium text-[#F26522]  border-[#F26522]">day</button>
                      <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-[#F26522]">week</button>
                      <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-[#F26522]">month</button>
                      <button className="p-2 ml-2 text-gray-400 hover:bg-gray-100 rounded-md">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className='border border-gray-200 rounded-lg p-4'>
                  <div className="flex items-center mb-0 ">
                    <div className="flex items-center mr-6">
                      <div className="w-5 h-5 bg-[#F26522] rounded-sm mr-2"></div>
                      <span className="text-sm text-gray-500">Income</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-[#F5DFBF] rounded-sm mr-2"></div>
                      <span className="text-sm text-gray-500">Outcome</span>
                    </div>
                  </div>
                  <div className="h-70 mt-4 rounded-lg p-4">
                    <ChartErrorBoundary>
                      <Suspense fallback={
                        <div className="flex items-center justify-center h-full">
                          <div className="text-gray-500">Loading chart...</div>
                        </div>
                      }>
                        <LazyBarChart data={chartData} />
                      </Suspense>
                    </ChartErrorBoundary>
                  </div>
                </div>
                </div>
                
                {/* Performance Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Restaurant’s growth</h3>
                        
                      <div className="w-3 h-3 bg-[#F26522] rounded-sm mr-2 inline-block align-middle"></div>
                      
                      <span className="text-sm font-semibold text-gray-700 align-middle">Your restaurant Performance</span>
                    </div>
                    <div className="ml-auto ">
                      <button className="px-3 py-1 text-sm border border-gray-200 bg-gray-100 hover:bg-gray-200 rounded flex items-center">
                        Monthly <span className="material-symbols-outlined ml-1 text-sm">expand_more</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center h-64 border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="relative w-full h-40 flex items-center justify-center">
                      <ReactSpeedometer
                        maxValue={100}
                        value={performanceData.percentage}
                        needleHeightRatio={0.7}
                        needleColor="#F26522"
                        startColor="#F26522"
                        segments={1}
                        endColor="#E5E5E5"
                        ringWidth={30}
                        textColor="transparent"
                        needleTransitionDuration={1500}
                        needleTransition="easeElastic"
                        currentValueText=""
                        fluidWidth={true}
                        customSegmentLabels={[]}
                        customSegmentStops={[0, performanceData.percentage, 100]}
                        segmentColors={["#F26522", "#E5E5E5"]}
                        needleCircleSize={4}
                        needleCircleColor="#F26522"
                        paddingHorizontal={20}
                        paddingVertical={20}
                        height={140}
                        width={240}
                      />
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-gray-600 text-sm">Your Grade: <span className="text-xl font-bold text-gray-900">{performanceData.percentage} %</span></p>
                    </div>
                  </div>
                </div>
                
                {/* Reserved Dates Calendar */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Reserved dates</h3>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    {/* Calendar Header */}
                    <div className="flex justify-between items-center mb-4">
                      <button 
                        onClick={goToPreviousMonth}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <div className="text-center">
                        <span className="font-medium text-[#F26522]">
                          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </span>
                      </div>
                      <button 
                        onClick={goToNextMonth}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Calendar Header - Days of week */}
                    <div className="grid grid-cols-7 text-center mb-2">
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
                        <div key={i} className="text-xs font-medium text-gray-500 py-2">{day}</div>
                      ))}
                    </div>
                    
                    {/* Calendar Grid - Days */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {renderCalendarDays()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Latest Sales Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Latest sales</h3>
                <div className="flex items-center space-x-1">
                  <button className="px-3 py-1 text-sm font-medium text-[#F26522]  border-[#F26522]">day</button>
                  <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-[#F26522]">week</button>
                  <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-[#F26522]">month</button>
                  <button className="p-2 ml-2 text-gray-400 hover:bg-gray-100 rounded-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm font-semibold text-gray-800 border-b border-gray-200">
                      <th className="pb-3 font-semibold">Food</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Quantity</th>
                      <th className="pb-3 font-semibold">Subtotal</th>
                      <th className="pb-3 font-semibold">Delivery</th>
                      <th className="pb-3 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {salesData.map((order, orderIndex) => (
                      <React.Fragment key={order.orderId}>
                        <tr className="text-sm text-gray-700">
                          <td colSpan={6} className="py-4">
                            <p className="font-semibold text-gray-900">Order {order.orderId}</p>
                            <p className="text-sm text-gray-600 font-normal">Customer : {order.customer}</p>
                          </td>
                        </tr>
                        {order.items.map((item, itemIndex) => (
                          <tr key={`${orderIndex}-${itemIndex}`} className="text-sm border-b border-gray-50">
                            <td className="py-4 flex items-center">
                                <img src={burgerImg} alt={item.name} className="h-20 w-20 mr-4 object-contain" />

                              <div>
                                <p className="font-semibold text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500 font-normal">{item.description}</p>
                              </div>
                            </td>
                            <td className="py-4">
                              <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                                item.status === 'Preparing' ? 'bg-orange-100 text-orange-600' :
                                item.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                'bg-red-100 text-red-600'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 text-gray-900 font-medium">{item.quantity}</td>
                            <td className="py-4 text-gray-900 font-medium">{item.subtotal}</td>
                            <td className="py-4 text-gray-500 font-normal">
                              {itemIndex === 0 ? '-' : ''}
                            </td>
                            <td className="py-4 text-gray-900 font-semibold">
                              {itemIndex === 0 ? '2000 DA' : ''}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-b border-gray-100">
                          <td colSpan={4} className="py-2"></td>
                          <td className="py-2 text-gray-700 font-semibold">{order.delivery}</td>
                          <td className="py-2 text-gray-900 font-bold">{order.total}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Previous
                </button>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button 
                      key={page}
                      className={`w-8 h-8 flex items-center justify-center text-sm rounded-md ${
                        page === 1 ? 'bg-[#F26522] text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                  Next
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
       
       
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
