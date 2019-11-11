defmodule Time2.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset

  schema "jobs" do
    field :budget_hours, :integer
    field :description, :string
    field :job_code, :string
    field :name, :string

    belongs_to :user, Time2.Users.User
    has_many :tasks, Time2.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:budget_hours, :description, :job_code, :name, :user_id])
    |> validate_required([:budget_hours, :description, :job_code, :name, :user_id])
  end
end
