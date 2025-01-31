export const mockShiftData = {
  currentShift: {
    startTime: new Date().toLocaleTimeString(),
    vehicle: "TX-2024-123",
    duration: "4h 30m",
    earnings: "€180.50",
  },
  weeklyStats: {
    totalHours: 38,
    totalEarnings: "€1,250.00",
    completedShifts: 5,
    averageRating: 4.8,
  },
  upcomingShifts: [
    {
      id: 1,
      date: "Tomorrow",
      time: "08:00 - 16:00",
      vehicle: "TX-2024-456",
    },
    {
      id: 2,
      date: "23 Apr",
      time: "14:00 - 22:00",
      vehicle: "TX-2024-789",
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "shift_start",
      time: "2 hours ago",
      description: "Started shift with vehicle TX-2024-123",
    },
    {
      id: 2,
      type: "photo_upload",
      time: "2 hours ago",
      description: "Uploaded vehicle inspection photos",
    },
    {
      id: 3,
      type: "location_update",
      time: "30 minutes ago",
      description: "Location updated - Downtown Area",
    },
  ],
};