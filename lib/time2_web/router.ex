defmodule Time2Web.Router do
  use Time2Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
#    plug Time2Web.Plugs.FetchCurrentUser
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

#  pipeline :api do
#    plug :accepts, ["json"]
#  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", Time2Web do
    pipe_through :ajax

    # added resources to display the individual database tables
    resources "/jobs", JobController
    resources "/users", UserController
    resources "/tasks", TaskController, except: [:new, :edit]
    resources "/timesheets", TimesheetController
    resources "/sessions", SessionController, only: [:create], singleton: true

    # added get resources
    get "/manager/:id/jobs", UserController, :show_manager_jobs
    get "/manager/:id/timesheets", UserController, :show_manager_timesheets
    get "/manager/:id/worker/:id/timesheets", UserController, :show_worker_timesheets

    # added post resources
    post("/timesheets/:id", TimesheetController, :approve)
  end


  scope "/", Time2Web do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Time2Web do
  #   pipe_through :api
  # end
end
