# Santa's List

As families gather together at Christmas, gift exchanges are not only common but necessary.

How do you know what to give loved ones? How do you know someone else hasn't already gifted the same thing you are wanting to give?

Introducing Santa's List. Gift lists amongst family and and friends to make the holiday's that much easier.

- Make your wish list and check it twice.
- Share your list with your group of loved ones.
- Reserve gifts you want to give from other lists in your group.
- Give the gift of gifts.

## Wireframe

![Login](Login.png)
![Home Page](HomePage.png)
![Lists](Lists.png)
![People](People.png)

## HTML
The calendar isn't as bad as they say. The default isn't bad.

## Things I learned from the Simon assignment and the html assignments
- Be deliberate with your html tags. There's a specific purpose, structure, and hierarchy.
- Make changes often, deploy often.
- Make smaller commits

## Javascript Simon
- Adding onClick events initialized the js, you can then add the .js at the bottom of the page.

## Startup JS Take-Aways
- As for now, local storage is where the data is stored, but that will change.
- Using the constructor in a class to set the default state of the app is really helpful.
- Some instances the event listener needs to be added in the html.

## Node
- include node-modules in .gitignore

## Simon Service
- make sure and update your gitignore for your startup applicaiton
- your deployService sh file has changed. Make sure and run the chmod on the file to make it accessible.
- Simon app had a cool calc for the height "height: calc(100px + 1em);" in the css file.
- your index.js files don't speak to each other from the front end and backend.
- make sure your index file has the correct folder name passed in for express.static for your static files.
- watch the class video two more times.
- Simon is listening on 3000, but your app will be on 4000.

## Simon DB
- UUID ==== Universally Unique Identifier
- Cookies store session data
- Logging out removes the session cookie.
- Login and create user can happen at the same time.
- Logout removes the authentication cookies.
- you might have to log out and log in to restart env variables.

## Simon Login
- 404 === not found.
- 401 === auth error.
- denial of service attack attack is a type of cyber attack where an attacker seeks to disrupt the normal functioning of a website, server, or network by overwhelming it with a flood of traffic or requests. The attacker typically does this by using a large number of compromised computers, known as a botnet, to send a huge amount of traffic or requests to the target system, effectively causing it to become unavailable to legitimate users. DOS attacks take forms such as flooding the target system with fake requests, exploiting vulnerabilities in the target's software, or simply overwhelming the system's resources by consuming too much bandwidth or processing powe.
- Setting cookies is how authorization is possible.
- Cookies contian tokens, or name value pairs.

## Simon Websocket
- Update and superset of http
- Clients communicate to server, server talks back with updates from other clients.
- You can see the messages from web socket in tools > network > messages.
- Ping and Pong is what keeps the connection alive.
