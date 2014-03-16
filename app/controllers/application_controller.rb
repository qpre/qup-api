class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :cors
#  before_filter :cors_preflight_check
 # after_filter :cors_set_access_control_headers
  
  # For all responses in this controller, return the CORS access control headers.

  def cors
    headers["Access-Control-Allow-Origin"] = "*"
    headers["Access-Control-Allow-Methods"] = %w{GET POST PUT DELETE}.join(",")
    headers["Access-Control-Allow-Headers"] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
    head(:ok) if request.request_method == "OPTIONS"
  end
  
  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = %w{GET POST PUT DELETE}.join(",")
    headers['Access-Control-Max-Age'] = "1728000"
    head(:ok) if request.request_method == "OPTIONS"
  end
  
  # If this is a preflight OPTIONS request, then short-circuit the
  # request, return only the necessary headers and return an empty
  # text/plain.
  
  def cors_preflight_check
    if request.method == :options
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      headers['Access-Control-Allow-Headers'] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
      headers['Access-Control-Max-Age'] = '1728000'
      render :text => '', :content_type => 'text/plain'
    end
  end
end


