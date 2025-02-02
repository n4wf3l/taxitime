import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Car,
  CreditCard,
  Calendar,
  MapPin,
  Camera,
  CheckCircle,
} from "lucide-react";
import { mockShiftData } from "@/utils/mockData";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Current Shift Card */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Current Shift</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Start Time</p>
              <p className="font-medium">
                {mockShiftData.currentShift.startTime}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Car className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Vehicle</p>
              <p className="font-medium">
                {mockShiftData.currentShift.vehicle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">
                {mockShiftData.currentShift.duration}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Earnings</p>
              <p className="font-medium">
                {mockShiftData.currentShift.earnings}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Hours
          </h3>
          <p className="text-2xl font-bold">
            {mockShiftData.weeklyStats.totalHours}h
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Earnings
          </h3>
          <p className="text-2xl font-bold">
            {mockShiftData.weeklyStats.totalEarnings}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Completed Shifts
          </h3>
          <p className="text-2xl font-bold">
            {mockShiftData.weeklyStats.completedShifts}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Average Rating
          </h3>
          <p className="text-2xl font-bold">
            {mockShiftData.weeklyStats.averageRating}
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="h-auto py-4 flex flex-col gap-2">
          <Camera className="h-6 w-6" />
          <span>Upload Photos</span>
        </Button>
        <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
          <MapPin className="h-6 w-6" />
          <span>Update Location</span>
        </Button>
        <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
          <Calendar className="h-6 w-6" />
          <span>View Schedule</span>
        </Button>
        <Button
          className="h-auto py-4 flex flex-col gap-2"
          variant="destructive"
        >
          <CheckCircle className="h-6 w-6" />
          <span>End Shift</span>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {mockShiftData.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 border-b last:border-0 pb-4"
            >
              {activity.type === "shift_start" && (
                <Clock className="text-primary" />
              )}
              {activity.type === "photo_upload" && (
                <Camera className="text-primary" />
              )}
              {activity.type === "location_update" && (
                <MapPin className="text-primary" />
              )}
              <div>
                <p className="font-medium">{activity.description}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Shifts */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Shifts</h2>
        <div className="space-y-4">
          {mockShiftData.upcomingShifts.map((shift) => (
            <div
              key={shift.id}
              className="flex items-center justify-between border-b last:border-0 pb-4"
            >
              <div className="flex items-center gap-4">
                <Calendar className="text-primary" />
                <div>
                  <p className="font-medium">{shift.date}</p>
                  <p className="text-sm text-muted-foreground">{shift.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Car className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {shift.vehicle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
