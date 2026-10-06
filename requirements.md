# Requirements - ageofwonders.org

- R1 [http GET /]: Responses carry Strict-Transport-Security.
- R2 [http GET /]: No response carries both Content-Length and Transfer-Encoding.
- R3 [http GET /]: No response sets a cookie.
- R4 [http GET /rss.xml]: Responses declare a content type.
- R5: The service worker never serves a page older than the current deploy.