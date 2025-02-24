async function getResourcesw() {
    try {
        const response = await fetch('http://localhost:3000/offers')
        return await response.json()
    } catch (e) {
        console.log("Error");

    } finally {
        console.log("Finally");

    }
}

export default getResourcesw