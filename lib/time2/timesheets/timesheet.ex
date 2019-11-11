defmodule Time2.Timesheets.Timesheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "timesheets" do
    field :date, :date
    field :status, :string, default: "pending"
    field :total_hours, :integer

    belongs_to :user, Time2.Users.User
    has_many :tasks, Time2.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(timesheet, attrs) do
    timesheet
    # casting tells the changeset what params (i.e. keys in attrs map) to pass through,
    # all other keys will be ignored
    |> cast(attrs, [:date, :status, :total_hours, :user_id])
      # make sure association is preloaded in the changeset struct
    |> cast_assoc(:tasks, required: true)
      #|> cast_assoc(:tasks, with: &Time2.Task.changeset/2)
    |> validate_required([:date, :status, :total_hours, :user_id])
  end
end
