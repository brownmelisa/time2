defmodule Time2Web.TimesheetControllerTest do
  use Time2Web.ConnCase

  alias Time2.Timesheets
  alias Time2.Timesheets.Timesheet

  @create_attrs %{
    date: ~D[2010-04-17],
    status: "some status",
    total_hours: 42
  }
  @update_attrs %{
    date: ~D[2011-05-18],
    status: "some updated status",
    total_hours: 43
  }
  @invalid_attrs %{date: nil, status: nil, total_hours: nil}

  def fixture(:timesheet) do
    {:ok, timesheet} = Timesheets.create_timesheet(@create_attrs)
    timesheet
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all timesheets", %{conn: conn} do
      conn = get(conn, Routes.timesheet_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create timesheet" do
    test "renders timesheet when data is valid", %{conn: conn} do
      conn = post(conn, Routes.timesheet_path(conn, :create), timesheet: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.timesheet_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "2010-04-17",
               "status" => "some status",
               "total_hours" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.timesheet_path(conn, :create), timesheet: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update timesheet" do
    setup [:create_timesheet]

    test "renders timesheet when data is valid", %{conn: conn, timesheet: %Timesheet{id: id} = timesheet} do
      conn = put(conn, Routes.timesheet_path(conn, :update, timesheet), timesheet: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.timesheet_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "2011-05-18",
               "status" => "some updated status",
               "total_hours" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, timesheet: timesheet} do
      conn = put(conn, Routes.timesheet_path(conn, :update, timesheet), timesheet: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete timesheet" do
    setup [:create_timesheet]

    test "deletes chosen timesheet", %{conn: conn, timesheet: timesheet} do
      conn = delete(conn, Routes.timesheet_path(conn, :delete, timesheet))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.timesheet_path(conn, :show, timesheet))
      end
    end
  end

  defp create_timesheet(_) do
    timesheet = fixture(:timesheet)
    {:ok, timesheet: timesheet}
  end
end
