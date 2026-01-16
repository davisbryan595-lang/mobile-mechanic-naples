import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface UseRealtimeSubscriptionOptions {
  event: "INSERT" | "UPDATE" | "DELETE" | "*";
  table: string;
  schema?: string;
  onPayload: (payload: RealtimePostgresChangesPayload<any>) => void;
}

export const useRealtimeSubscription = ({
  event,
  table,
  schema = "public",
  onPayload,
}: UseRealtimeSubscriptionOptions) => {
  useEffect(() => {
    const channel = supabase.channel(`${table}-${event}-changes`);

    channel
      .on(
        "postgres_changes",
        {
          event,
          schema,
          table,
        },
        onPayload
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [event, table, schema, onPayload]);
};
