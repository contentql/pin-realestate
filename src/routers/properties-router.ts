import { getPayloadClient } from "../get-payload";
import { publicProcedure, router } from "../trpc/trpc";

export const propertiesRouter = router({
  getProperties: {
    list: publicProcedure.query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const payload = await getPayloadClient();

      const properties = await payload.find({ collection: "properties" });
      //    ^?
      return properties;
    }),
  },
});
