import

{SSMClient, GetParameterCommand}
from

"@aws-sdk/client-ssm";
import

{fromNodeProviderChain}
from

"@aws-sdk/credential-providers";

const
ssmClient = new
SSMClient({
    region: "us-east-1",
    credentials: fromNodeProviderChain()
});

export
const
handler = async (event) = > {
    console.log("Full Event:", JSON.stringify(event, null, 2));

try {
if (!event.queryStringParameters?.city) {
console.error("Missing city parameter");
return {
    statusCode: 400,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({error: "City parameter is required"})
};
}

const
city = event.queryStringParameters.city.trim();
console.log("Processing city:", city);

// Get
API
Key
const
parameter = await ssmClient.send(
new
GetParameterCommand({
    Name: "/App/API_KEY",
    WithDecryption: true
})
);
console.log("Successfully retrieved API key");

// Call
OpenWeather
const
apiUrl = `https: // api.openweathermap.org / data / 2.5 / weather?q =${city} & units = metric & appid =${
    parameter.Parameter.Value}
`;
console.log("Calling OpenWeather API:", apiUrl);

const
weatherResponse = await fetch(apiUrl);
console.log("OpenWeather response status:", weatherResponse.status);

if (!weatherResponse.ok)
{
const
errorBody = await weatherResponse.text();
console.error("OpenWeather API error:", errorBody);
throw
new
Error(`OpenWeather
Error: ${weatherResponse.statusText}
`);
}

const
weatherData = await weatherResponse.json();
console.log("Successful response:", JSON.stringify(weatherData, null, 2));

return {
    statusCode: 200,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(weatherData)
};

} catch(error)
{
console.error("Full error:", error);
return {
    statusCode: 500,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
        error: "Internal Server Error",
        details: error.message
    })
};
}
};