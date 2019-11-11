defmodule Time2.Repo do
  use Ecto.Repo,
    otp_app: :time2,
    adapter: Ecto.Adapters.Postgres
end
