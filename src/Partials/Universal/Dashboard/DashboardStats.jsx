import React from 'react';
import Chart from 'react-apexcharts';
// import { 
//     useGetDashboardStatsQuery, 
//     useGetBookingTrendsQuery 
// } from '../services/dashboardAPI';
import { useGetDashboardStatsQuery, useGetBookingTrendsQuery } from '../../../services/dashboardAPI';
import BookingTable from './Components/BookingTable'

const DashboardStats = () => {
  // Fetch dashboard stats and booking trends
  const { data: statsData, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: trendsData, isLoading: trendsLoading } = useGetBookingTrendsQuery();

  // Early return for loading state
  if (statsLoading || trendsLoading) {
    return <div>Loading...</div>;
  }

  // Extract stats from the API response
  const stats = statsData?.data || {
    todayBookings: 0,
    totalAmount: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    growthRates: {
      bookings: 0,
      amount: 0,
      customers: 0,
      revenue: 0
    }
  };

  // Prepare card data using stats
  const cardData = [
    {
      title: 'Today Booking',
      value: stats.todayBookings,
      text: 'From previous period',
      per: `${stats.growthRates.bookings.toFixed(1)}%`,
      bg_color: 'bg-primary'
    },
    {
      title: 'Total Amount',
      value: `₹${stats.totalAmount.toLocaleString()}`,
      text: 'New income',
      per: `${stats.growthRates.amount.toFixed(1)}%`,
      bg_color: 'bg-info'
    },
    {
      title: 'Total Customer',
      value: stats.totalCustomers.toLocaleString(),
      text: 'From previous period',
      per: `${stats.growthRates.customers.toFixed(1)}%`,
      bg_color: 'bg-warning'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      text: 'From previous period',
      per: `${stats.growthRates.revenue.toFixed(1)}%`,
      bg_color: 'bg-success'
    }
  ];

  // Extract trend data for the chart
  const trends = trendsData?.data || [];
  const chartData = {
    confirmedBookings: trends.map(t => t.confirmed),
    pendingBookings: trends.map(t => t.pending),
    labels: trends.map(t => t.date)
  };

  // Chart configuration
  const chartOptions = {
    chart: {
      height: 280,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    colors: ['var(--theme-color4)', 'var(--theme-color5)'],
    series: [{
      name: 'Booking Confirmed',
      type: 'column',
      data: chartData.confirmedBookings
    }, {
      name: 'Booking Pending',
      type: 'line',
      data: chartData.pendingBookings
    }],
    stroke: {
      width: [0, 4]
    },
    labels: chartData.labels,
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function(value) {
          const date = new Date(value);
          return date.toLocaleDateString('default', { month: 'short', year: 'numeric' });
        }
      }
    },
    yaxis: [{
      title: {
        text: 'Booking Confirmed',
      },
    }, {
      opposite: true,
      title: {
        text: 'Booking Pending'
      }
    }]
  };

  return (
    <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
      <div className="row g-3 mb-3">
        {cardData.map((data, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className="card">
              <div className="card-header">
                <h6 className="card-title mb-0">{data.title}</h6>
              </div>
              <div className="card-body">
                <h2>{data.value}</h2>
                <span className={`badge ${data.bg_color} ${parseFloat(data.per) < 0 ? 'text-danger' : ''}`}>
                  {parseFloat(data.per) >= 0 ? '+' : ''}{data.per}
                </span>
                <span className="text-muted"> {data.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="row g-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">Reservations</h6>
            </div>
            <div className="card-body">
              <div id="reservations">
                <Chart
                  options={chartOptions}
                  series={chartOptions.series}
                  height={chartOptions.chart.height}
                  type={chartOptions.chart.type}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12">
                <div className="card">
                    <div className="card-header">
                        <h6 className="card-title">Today Booking List</h6>
                    </div>
                    <div className="card-body">
                      <BookingTable/>
                    </div>
                </div>
            </div>


      </div>
    </div>
  );
};

export default DashboardStats;