defmodule Time2Web.UserView do
  use Time2Web, :view
  alias Time2Web.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      is_manager: user.is_manager,
      name: user.name,
      password: user.password,
      password_confirmation: user.password_confirmation,
      password_hash: user.password_hash}
  end
end
