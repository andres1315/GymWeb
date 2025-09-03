import z from "zod";

export const AppConfigSchema = z
  .object({
    // Basic info company
    name: z.string({ error: "Ingrese un Nombre" }).trim().min(1, { message: "Nombre es requerido" }),
    company_name: z.string({ error: "Ingrese una razón social" }).trim().min(1, { message: "razón social es requerido" }),
    address:z.string().optional(),
    email:z.string().optional(),
    nit:z.string({error: "Ingrese un Nit" }),
    phone:z.number().positive().optional(),
    main_address:z.string().optional(),
    website:z.string().optional(),
    site:z.number().optional(),
    city:z.number().optional(),

    /* Tax info company */
    resolution_current: z.string().optional(),
    resolution_start_date: z.string().optional(),
    resolution_exp_date: z.string().optional(),
    resolution_validity: z.string().optional(),
    resolution_start_number: z.number().optional(),
    resolution_end_number: z.number().optional(),
    resolution_prefix: z.string().optional(),
    act_dian: z.string().optional(),
    act_ica: z.string().optional(),
    tariff: z.number().optional(),
    reteiva:z.number().optional(),
    commercial_registration:z.string().optional(),
    withholding:z.number().optional(),
    regime_vat:z.number().optional(),
    vat:z.number().optional(),

    /* General config */
    is_electronic_biller: z.boolean(),
    contingency: z.boolean(),
    date_format:z.string({ error: "Seleccione un Formato de fecha" }),
    currency:z.string({ error: "Seleccione una moneda" }),
    adds_potential_customers:z.boolean(),
    required_year_issuescard_customer:z.boolean(),
    required_type_customer_issuescard_customer:z.boolean(),
    manages_corporate_customer:z.boolean(),
    required_classification_customer:z.boolean(),
    required_place_birth_issuescard_customer:z.boolean(),
    groups_users:z.boolean(),
    required_company_issuescard_customer:z.boolean(),
    manages_cost_center:z.boolean(),
    how_did_you_hear_about_us:z.boolean(),
    manages_last_name:z.boolean(),
    ban_users:z.boolean(),
    percentage_recognition_freezing:z.number().optional(),
    physiotherapy_holiday:z.boolean(),
    discount_extension_days:z.boolean(),
    save_dni_user:z.boolean(),
    capture_directly_photo:z.boolean(),
    new_customer_courtesy_days:z.number().optional()



    
  })
  ;

export type formAppConfig = z.infer<typeof AppConfigSchema>;