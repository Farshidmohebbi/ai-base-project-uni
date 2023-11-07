from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utility import routers as utility_router

app = FastAPI(
    title="Simple utility Api",
    description="a simple utility api for university project",
    version="0.0.1",
    terms_of_service="http://example.com/terms/",
    # contact={
    #     "name": "",
    #     "url": "",
    #     "email": "",
    # },
    license_info={"name": "MIT"},
    # openapi_tags=tags_metadata,
    docs_url="/swagger",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    print("done")


@app.on_event("shutdown")
async def shutdown():
    print("shutdown")


app.include_router(utility_router.router)

api_prefix = "/api"
app.mount(api_prefix, app)