# Use the official NGINX base image
FROM nginx:latest

# Copy the custom default.conf file to the NGINX configuration directory
COPY ./dockerfiles/prod/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./dockerfiles/prod/nginx/build/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]