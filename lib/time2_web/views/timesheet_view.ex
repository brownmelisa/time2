defmodule Time2Web.TimesheetView do
  use Time2Web, :view
  alias Time2Web.TimesheetView

  def render("index.json", %{timesheets: timesheets}) do
    %{data: render_many(timesheets, TimesheetView, "timesheet.json")}
  end

  def render("show.json", %{timesheet: timesheet}) do
    %{data: render_one(timesheet, TimesheetView, "timesheet.json")}
  end

  def render("timesheet.json", %{timesheet: timesheet}) do
    %{id: timesheet.id,
      user_id: timesheet.user_id,
      date: timesheet.date,
      status: timesheet.status,
      total_hours: timesheet.total_hours}
  end
end
