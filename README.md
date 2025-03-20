# Weather-App
# Weather App: Serverless Backend with AWS Lambda and API Gateway

This project provides a serverless backend for a weather application, leveraging AWS Lambda, API Gateway, and AWS Systems Manager (SSM) Parameter Store. The backend securely retrieves weather data from the OpenWeather API and serves it to a static frontend hosted on S3.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Setup Instructions](#setup-instructions)
   - [Lambda Configuration](#lambda-configuration)
   - [API Gateway Setup](#api-gateway-setup)
   - [S3 Frontend Deployment](#s3-frontend-deployment)
4. [Competition Requirements](#competition-requirements)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## Project Overview
The project consists of:
- **AWS Lambda**: Retrieves weather data using an API key stored in SSM Parameter Store.
- **API Gateway**: Provides a RESTful endpoint for the frontend to query weather data.
- **S3**: Hosts the static frontend website.
- **SSM Parameter Store**: Securely stores the OpenWeather API key.

---

## Architecture Diagram
```mermaid
graph TD
    A[User] --> B[S3 Static Website]
    B --> C[API Gateway]
    C --> D[Lambda Function]
    D --> E[Parameter Store]
    D --> F[OpenWeather API]

