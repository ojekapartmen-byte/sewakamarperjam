REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;
CREATE POLICY "Public can read public site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (key IN (
  'canonical_url','meta_description','meta_keywords','meta_title',
  'price_daily','price_transit','property_description','property_title',
  'site_name','site_tagline','whatsapp_message','whatsapp_number'
));