defmodule Time2.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :hours_worked, :integer
    field :note, :string
    field :user_id, :id

    belongs_to :timesheet, Time2.Timesheets.Timesheet
    belongs_to :job, Time2.Jobs.Job

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:hours_worked, :note, :timesheet_id, :job_id, :user_id])
    |> validate_required([:hours_worked, :note, :timesheet_id, :job_id, :user_id])
  end
end
