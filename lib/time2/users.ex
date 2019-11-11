defmodule Time2.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias Time2.Repo
  alias Time2.Users.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)
#  def get_user!(id) do
#    Repo.get! from u in User,
#      where: u.id == ^id,
#      preload: [:manager]
#  end

  # helper function for fetch_current_user.ex plug
  def get_user(id), do: Repo.get(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  ##### ADDED FUNCTIONS #####
  # authenticate function is used in the session controller
  def authenticate_user(email, pass) do
    user = Repo.get_by(User, email: email)
    case Argon2.check_pass(user, pass) do
      {:ok, user} -> user
      _ -> nil
    end
  end

  # get user with all preloads: jobs, tasks, timesheets, workers
  def get_user_with_preloads!(id) do
    Repo.one from uu in User,
             where: uu.id == ^id,
             preload: [:jobs, :tasks, :timesheets, :workers]
  end

  # get a list of all manager names
  def get_manager_names!() do
    Repo.all(from u in User, where: u.is_manager == true)
    |> Enum.map(fn x -> x.name end)
  end

  # get a list of all manager ids
  def get_manager_ids!() do
    Repo.all(from u in User, where: u.is_manager == true)
    |> Enum.map(fn x -> x.id end)
  end

  # get a list of all worker names
  def get_worker_names!() do
    Repo.all(from u in User, where: u.is_manager == false)
    |> Enum.map(fn x -> x.name end)
  end

  # get user id of a given name
  def get_user_id_from_name(name) do
    user = Repo.one from uu in User,
                    where: uu.name == ^name
    user.id
  end
end
