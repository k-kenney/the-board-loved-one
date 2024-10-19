import { Client, Databases, Query } from "appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "6669db7400175443d747",
  databaseId: "666c838b002905b66f25",
  caregiversId: "666ca9b700340d5d8392",
  lovedOnesId: "6675d5bb0027f6a3d9ff",
  concernsId: "669977d60039b0ca20fb",
  eventsId: "66b8d389001345dab3ef",
};

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const getLovedOneId = async (lovedOneKey) => {
  try {
    const lovedOnes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.lovedOnesId,
      [Query.equal("key", lovedOneKey)]
    );

    // Check if any loved ones were found
    if (lovedOnes.total === 0) {
      throw new Error("No loved one found with the provided key.");
    }

    // Return the first loved one's ID
    return lovedOnes.documents[0].$id;
  } catch (error) {
    console.error("Error fetching loved one:", error);
    throw new Error(error.message);
  }
};

export const getConcerns = async (lovedOneId) => {
  try {
    const concerns = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.concernsId,
      [Query.search("loved_one_id", lovedOneId)]
    );

    console.log(concerns);

    return concerns.documents;
  } catch (error) {
    console.error("Error fetching concerns:", error);
    throw new Error(error.message);
  }
};

export const getTodaysEvents = async (lovedOneId) => {
  // Get today's date
  const today = new Date();
  // Set the time to midnight to match only the date portion
  today.setHours(0, 0, 0, 0);
  const isoToday = today.toISOString();

  try {
    // Fetch events scheduled for today (non-recurring)
    const todaysEvents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventsId,
      [
        Query.search("loved_one_id", lovedOneId),
        Query.equal("event_date", isoToday),
        Query.equal("recurring", false),
      ]
    );

    // Fetch all recurring events
    const recurringEvents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventsId,
      [Query.search("loved_one_id", lovedOneId), Query.equal("recurring", true)]
    );

    // Combine today's events and recurring events
    const allEvents = [...todaysEvents.documents, ...recurringEvents.documents];

    // Sort allEvents by start_time
    const sortedEvents = allEvents.sort((a, b) => {
      // Extract time components from each Date object
      const dateA = new Date(a.start_time);
      const dateB = new Date(b.start_time);
      const timeA = dateA.getHours() * 60 + dateA.getMinutes(); // Convert to total minutes
      const timeB = dateB.getHours() * 60 + dateB.getMinutes(); // Convert to total minutes
      return timeA - timeB; // Sort in ascending order (earliest first)
    });

    console.log("Sorted Events by Time:", sortedEvents);

    return sortedEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error(error.message);
  }
};
