# Main Concepts

The system is separated to multiple layers

- Edge => this layer responsible for interacting with the outer world. Its purpose to validate sanitize and translate the incoming objects to understandable values
- Business => This layer contains the business logic. Its purpose is to transform the DTO-s from edge layer to BO-s and to contain the business logic
- Repository => This layer contains the interaction toward the database. It is using entities. The knowledge to transofrm entities to BO-s also resides here.

### We are identifying each request with unique id through the GuidService.
This way every request can be followed in the logs of the system.