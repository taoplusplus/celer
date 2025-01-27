use crate::ccmd::arg;

pub const T_BUNDLE: &str = "bundle";
pub const T_MERGE: &str = "merge";
const TARGETS: [&str; 2] = [T_BUNDLE, T_MERGE];

pub fn get_subcommand() -> clap::Command<'static> {
    clap::Command::new("build")
        .about("Build project")
        .arg(arg::debug_flag())
        .arg(
            clap::Arg::new("target")
                .short('t')
                .long("target")
                .help(const_format::formatcp!("Specify the build target. Possible values: {} (default), {}", TARGETS[0], TARGETS[1]))
                .value_parser(TARGETS)
                .action(clap::ArgAction::Set)
                .number_of_values(1)
                .default_value(const_format::formatcp!("{}", TARGETS[0]))
        )
        .arg(
            clap::Arg::new("yaml")
                .short('y')
                .long("yaml")
                .help("Output in YAML format instead of JSON. File name will be *.yaml as well")
                .conflicts_with(arg::DEBUG)
                .action(clap::ArgAction::SetTrue)
        )

}

/// Configuration of celer build
#[derive(Debug)]
pub struct Config {
    pub debug: bool,
    pub target: String,
    pub yaml: bool,
}

impl Config {
    pub fn from(args: &clap::ArgMatches) -> Self {
        let debug = arg::has_flag(args, arg::DEBUG);
        let target = args.get_one::<String>("target").unwrap().to_string();
        let yaml = arg::has_flag(args, "yaml");

        Self {
            debug,
            target,
            yaml
        }
    }
}
