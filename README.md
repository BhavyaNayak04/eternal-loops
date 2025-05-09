## e commerce platform for my sister - eternal loops

i have used next js, express js and mongo db for this project.

ui is set up for the user part,
functionalities are added like basic login signup, interactiviy like liking posts, exploring products, adding them to cart etc.
basic apis are all created and integrated for user, cart, custom order, newsletter, cart, post likes.

things remaining are:

~~1. jwt refresh token table~~
2. state management like redux for frontend to manage user details efficiently - currently it relies on useContext, and currently jwt is not stored in the httpOnly cookie which is unsafe
3. pagination for the apis and search features
4. admin dashboard (ui and apis) for controlled access for my sister - mainly for adding new products, reviewing custom orders, etc.
5. razor pay integration
6. third party integration for tracking shipping

u can try this out by first creating ur own mongodb atlas, then paste the mongodb uri in the backend env. put ur own jwt secret. 
frontend, there is a base url required, that is basically `http://localhost:5000/api`

ai is used for generating stuff but logic is definitely mine. i have built this in 3 days, and now kinda tired. i will come back to this when i am free.
