import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettings = Record<string, string>;

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      const map: SiteSettings = {};
      data?.forEach((row: { key: string; value: string }) => {
        map[row.key] = row.value;
      });
      setSettings(map);
      setLoading(false);
    };
    fetch();

    const channel = supabase
      .channel("site_settings_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "site_settings" }, (payload) => {
        const row = payload.new as { key: string; value: string } | undefined;
        if (row) {
          setSettings((prev) => ({ ...prev, [row.key]: row.value }));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { settings, loading };
};

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Array<{ id: string; name: string; text: string; rating: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order");
      setTestimonials(data || []);
      setLoading(false);
    };
    fetch();

    const channel = supabase
      .channel("testimonials_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "testimonials" }, () => {
        fetch();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { testimonials, loading };
};
