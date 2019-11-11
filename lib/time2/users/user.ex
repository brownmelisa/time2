defmodule Time2.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :is_manager, :boolean, default: false
    field :name, :string
    field :password, :string
    field :password_confirmation, :string
    field :password_hash, :string

    has_many :timesheets, Time2.Timesheets.Timesheet
    has_many :jobs, Time2.Jobs.Job

    # implement the manager/worker relationship
    belongs_to :manager, Time2.Users.User
    has_many :workers, Time2.Users.User, foreign_key: :manager_id

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs,
         [:email, :is_manager, :name, :password, :password_confirmation, :manager_id])
    |> validate_confirmation(:password)
    |> validate_length(:password, min: 8) # too short
    |> hash_password()
    |> validate_required([:email, :is_manager, :name, :password_hash])
    |> unique_constraint(:email)
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    if pw do
      change(cset, Argon2.add_hash(pw))
    else
      cset
    end
  end
end
